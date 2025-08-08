export const stockRequestSchema = {
  type: "object",
  properties: {
    symbol: {
      type: "string",
      minLength: 1,
      maxLength: 10,
      pattern: "^[A-Z]+$"
    },
    interval: {
      type: "string",
      enum: ["1min", "5min", "15min", "30min", "60min"],
      default: "5min"
    }
  },
  required: ["symbol"],
  additionalProperties: false
};

export const stockResponseSchema = {
  type: "object",
  properties: {
    meta: {
      type: "object",
      properties: {
        symbol: { type: "string" },
        interval: { type: "string" },
        currency: { type: "string" },
        exchange_timezone: { type: "string" },
        exchange: { type: "string" },
        mic_code: { type: "string" },
        type: { type: "string" }
      },
      required: ["symbol", "interval", "currency", "exchange"]
    },
    values: {
      type: "array",
      items: {
        type: "object",
        properties: {
          datetime: { type: "string" },
          open: { type: "string" },
          high: { type: "string" },
          low: { type: "string" },
          close: { type: "string" },
          volume: { type: "string" }
        },
        required: ["datetime", "open", "high", "low", "close", "volume"]
      }
    },
    status: { type: "string" }
  },
  required: ["meta", "values", "status"]
};