import { builder } from "./builder";

import "./entry/articleEntries";
import "./entry/articleEntryByPath";
import "./entry/entries";
import "./entry/entriesByTags";
import "./entry/pickedEntries";

export const schema = builder.toSchema();
