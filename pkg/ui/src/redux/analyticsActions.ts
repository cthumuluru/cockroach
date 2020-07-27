// Copyright 2020 The Cockroach Authors.
//
// Use of this software is governed by the Business Source License
// included in the file licenses/BSL.txt.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0, included in the file
// licenses/APL.txt.

import { PayloadAction } from "src/interfaces/action";

export const TRACK_STATEMENTS_SEARCH = "cockroachui/analytics/TRACK_STATEMENTS_SEARCH";
export const TRACK_STATEMENTS_PAGINATION = "cockroachui/analytics/TRACK_STATEMENTS_PAGINATION";

export function trackStatementsSearchAction(searchResults: number): PayloadAction<number> {
  return {
    type: TRACK_STATEMENTS_SEARCH,
    payload: searchResults,
  };
}

export function trackStatementsPaginationAction(pageNum: number): PayloadAction<number> {
  return {
    type: TRACK_STATEMENTS_PAGINATION,
    payload: pageNum,
  };
}
