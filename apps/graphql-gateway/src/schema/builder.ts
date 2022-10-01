import { GraphQLDate } from "graphql-scalars";
import SchemaBuilder from "@pothos/core";
import { Context } from "../context";
import { DateString } from "../data/types";
import RelayPlugin from "@pothos/plugin-relay";

export const builder = new SchemaBuilder<{
  Context: Context;
  Scalars: {
    Date: {
      Input: DateString;
      Output: DateString;
    };
  };
}>({
  plugins: [RelayPlugin],
  relayOptions: {
    cursorType: "String",
  },
});

builder.queryType();

builder.addScalarType("Date", GraphQLDate, {});
