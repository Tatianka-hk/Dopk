const { Resolver } = require("dns").promises;
const path = require("path");
const resolver = new Resolver();
const _ = require("lodash");
const recordTypes = ["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "TXT"];

const ERRORS = {
  BAD_REQUEST: "BAD_REQUEST",
  BAD_RECORD_TYPE: "BAD_RECORD_TYPE",
  DNS_CRASH: "DNS_CRASH",
  BAD_METHOD: "BAD_METHOD",
};

const CustomError = (message, status = 500) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const getErrorResponce = (e, url, recordType, res) => {
  return res.status(e.status).json({
    errors: [
      {
        url,
        recordType,
        code: e.message,
      },
    ],
  });
};

const getSuccessResponce = (records, url, recordType, res) => {
  records = _.flattenDeep(records);
  return res.status(200).json({
    url,
    recordType,
    records,
  });
};

export default function handler(req, res) {
  if (req.method !== "GET") {
    throw CustomError(ERRORS.BAD_RECORD_TYPE);
  }
  const { url, recordType } = req.query;

  try {
    if (!url || !recordType) throw CustomError(ERRORS.BAD_REQUEST);
    if (!recordTypes.includes(recordType))
      throw CustomError(ERRORS.BAD_RECORD_TYPE);

    resolver
      .resolve(url, recordType)
      .then(getSuccessResponce)
      .catch((err) => {
        if (err.code === "ENODATA")
          return getSuccessResponce([], url, recordType, res);
        getErrorResponce(CustomError(err.code, 404), url, recordType, res);
      });
  } catch (e) {
    return getErrorResponce(e, url, recordType, res);
  }
}
