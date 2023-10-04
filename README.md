# eslint-plugin-imports-whitespace-bezier-curve

<img src="https://github.com/MatthewStanciu/eslint-plugin-imports-whitespace-bezier-curve/assets/14811170/977689d1-5873-453d-8d10-6abfde40b991" alt="demo" width="75%" />

A silly little ESLint plugin to enforce that the import statements in a file follow a predefined cubic Bezier curve.

If you use Prettier, this plugin will conflict with it. But that's part of the fun 😈

[View on npm](https://www.npmjs.com/package/eslint-plugin-imports-whitespace-bezier-curve)

## Install

`$ pnpm i eslint-plugin-imports-whitespace-bezier-curve --save-dev`

Add the plugin & rule to your ESLint config (`.eslintrc.json`):

```json
{
  "plugins": ["eslint-plugin-imports-whitespace-bezier-curve"],
  "rules": {
    "imports-whitespace-bezier-curve/imports-whitespace-bezier-curve": "warn"
  }
}
```

## Example

```js
import { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

import Hero from "../components/hero";
import Email from "../components/email";
import Community from "../components/community";
import Workshops from "../components/workshops";
import HackNight from "../components/hack-night";
import JoinUs from "../components/join-us";
import { IEvent } from "../utils/interfaces/SanityEvent";

import { DraggableContext } from "../context/DraggableContext";
import { fetchEvents } from "../utils/fetchEvents";
import Footer from "../components/footer";
```

this becomes:

```js
import Head from 'next/head';
import    { NextPage } from 'next';
import       { GetStaticProps } from 'next';
import         Hero from '../components/hero';
import          Email from '../components/email';
import          Footer from '../components/footer';
import          JoinUs from '../components/join-us';
import           Community from '../components/community';
import           Workshops from '../components/workshops';
import           HackNight from '../components/hack-night';
import            { fetchEvents } from '../utils/fetchEvents';
import              { useEffect, useState, useMemo } from 'react';
import                 { IEvent } from '../utils/interfaces/SanityEvent';
import                     { DraggableContext } from '../context/DraggableContext';
```

The more import statements you have, the higher "resolution" the curve becomes.

<details>

<summary>example with 25 import statements</summary>

```js
import Test1 from "a";
import Test2 from "bv";
import Test3 from "ckj";
import Test4 from "dqwe";
import Test5 from "fniru";
import Test6 from "gtshjy";
import Test7 from "haklsdh";
import Test8 from "ipmjelqs";
import Test9 from "jdmwekfle";
import Test10 from "kjawioefjw";
import Test11 from "lheuaklsjfl";
import Test13 from "nahdslieurnb";
import Test12 from "mgdlqwejtskj";
import Test14 from "ogdkwmeurkfhd";
import Test15 from "pxnfhekjslfheu";
import Test16 from "qamjdhwuierkhfn";
import Test17 from "rqnsgldkwmeufhls";
import Test18 from "siqhekjdwmurflgl";
import Test19 from "tjwhedklweurflhwe";
import Test20 from "ukdhslwekjrfhlweju";
import Test21 from "vsndlkwjeurhflejrh";
import Test22 from "wjdkshlekwurhflejsd";
import Test23 from "xahdksjlekwjhrflejwr";
import Test24 from "yksjdhfkjwehrfkjwehr";
import Test25 from "zkjshdfkjwehrfkljwehrf";
```

this becomes:

```js
import Test1 from 'a';
import   Test2 from 'bv';
import      Test3 from 'ckj';
import        Test4 from 'dqwe';
import         Test5 from 'fniru';
import           Test6 from 'gtshjy';
import           Test7 from 'haklsdh';
import            Test8 from 'ipmjelqs';
import             Test9 from 'jdmwekfle';
import             Test10 from 'kjawioefjw';
import             Test11 from 'lheuaklsjfl';
import             Test13 from 'nahdslieurnb';
import             Test12 from 'mgdlqwejtskj';
import             Test14 from 'ogdkwmeurkfhd';
import             Test15 from 'pxnfhekjslfheu';
import             Test16 from 'qamjdhwuierkhfn';
import             Test17 from 'rqnsgldkwmeufhls';
import              Test18 from 'siqhekjdwmurflgl';
import               Test19 from 'tjwhedklweurflhwe';
import               Test20 from 'ukdhslwekjrfhlweju';
import                 Test21 from 'vsndlkwjeurhflejrh';
import                  Test22 from 'wjdkshlekwurhflejsd';
import                    Test23 from 'xahdksjlekwjhrflejwr';
import                       Test24 from 'yksjdhfkjwehrfkjwehr';
import                          Test25 from 'zkjshdfkjwehrfkljwehrf';
```

</details>
