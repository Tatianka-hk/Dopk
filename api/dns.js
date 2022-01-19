const { Resolver } = require("dns").promises;
const resolver = new Resolver();

const recordTypes = [
  "A",
  "AAAA",
  "ANY",
  "CAA",
  "CNAME",
  "MX",
  "NAPTR",
  "NS",
  "PTR",
  "SOA",
  "SRV",
  "TXT",
];

const ERRORS = {
  BAD_REQUEST: "BAD_REQUEST",
  BAD_RECORD_TYPE: "BAD_RECORD_TYPE",
  DNS_CRASH: "DNS_CRASH",
};

const CustomError = (message, status = 400) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(403).json({
      errors: [`Forbidden to make requests to ${req.method} /api/dns`],
    });
  }
  const { url, recordType } = req.query;
  const getErrorResponce = (e) => {
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

  const getSuccessResponce = (records) => {
    return res.status(200).json({
      url,
      recordType,
      records,
    });
  };

  try {
    if (!url || !recordType) throw CustomError(ERRORS.BAD_REQUEST);
    if (!recordTypes.includes(recordType))
      throw CustomError(ERRORS.BAD_RECORD_TYPE);

    resolver
      .resolve(url, recordType)
      .then(getSuccessResponce)
      .catch((err) => {
        if (err.code === "ENODATA") return getSuccessResponce([]);
        getErrorResponce(CustomError(err.code, 500));
      });
  } catch (e) {
    return getErrorResponce(e);
  }
}
