/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const entries: [string, string][] = [
  ['Trudeau', '#d62728'],
  ['Harper', '#1f77b4'],
  ['Martin', '#ff7f0e'],
  ['Chrétien', '#2ca02c'],
  ['Campbell', '#9467bd'],
  ['Mulroney', '#8c564b'],
  ['Turner', '#e377c2'],
  ['Clark', '#bcbd22'],
  ['Pearson', '#17becf'],
  ['Diefenbaker', '#aec7e8'],
  ['Laurent', '#ffbb78'],
  ['King', '#98df8a'],
  ['Meighen', '#c5b0d5'],
  ['Borden', '#c49c94'],
  ['Laurier', '#f7b6d2'],
];

export interface UserProfile {
  name: string;
  color: string;
}

export interface ActiveUserProfile extends UserProfile {
  userId: number;
}

export function getRandomUserProfile(): UserProfile {
  const entry = entries[Math.floor(Math.random() * entries.length)];
  return {
    color: entry[1],
    name: entry[0],
  };
}
