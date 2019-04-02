import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, number } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import faker from "faker";

import generateColumns from "./generateColumns";
import generateData from "./generateData";

import Table, { AutoResizer } from "../index";

const tableStories = storiesOf("Table", module);

const columns = generateColumns(10);
const data = generateData(columns, 200);

tableStories.add(
  "default",
  withInfo()(() => (
    <Table width={800} height={400} columns={columns} data={data} />
  ))
);
