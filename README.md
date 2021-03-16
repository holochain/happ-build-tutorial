# How to build Holochain DNA

[![Project](https://img.shields.io/badge/project-holochain-blue.svg?style=flat-square)](http://holochain.org/)
[![Forum](https://img.shields.io/badge/chat-forum%2eholochain%2enet-blue.svg?style=flat-square)](https://forum.holochain.org)
[![Chat](https://img.shields.io/badge/chat-chat%2eholochain%2enet-blue.svg?style=flat-square)](https://chat.holochain.org)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

*as of 2021-03-21*

## Important documentation

- [HC CLI docs](https://github.com/holochain/holochain/tree/develop/crates/hc)
- [HDK docs](https://docs.rs/hdk/0.0.100/hdk/)

## Steps

### 0. Install nix-shell

1. If you haven't yet, install the [nix-shell](https://developer.holochain.org/docs/install/#install-the-nix-package-manager).

> Note that you don't need to do the `nix-shell https://holochain.love` step, since in this repository we provide an example `default.nix` file that provides the appropriate versions for the binaries that you will need.

2. Enter the nix-shell for this repository by running `nix-shell .` in this folder. This will take a long time in the first run.
   - Verify everything is working fine with `holochain -V` and `hc -V`.

### 1. Write your Zomes

Each zome is a Rust crate. See [zomes/whoami](zomes/whoami) and [zomes/foo](zomes/foo) for examples.

### 2. Build your Zomes into Wasm

When you want to (re)build your zomes into Wasm, simply run

```bash
CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown
```

and they will be available in `target/wasm32-unknown-unknown/release/`

### 3. Package your Wasms into a DNA file

1. Create a new dna workdir with `hc dna init <DNA_FOLDER>`.
  - This will create a `dna.yaml` in it with the necessary initial configuration.
2. Add your zomes to the `dna.yaml` file with references the `*.wasm` files you built in the previous step (see `workdir/dna/dna.yaml` for examples).
3. Run the following command to package your Wasms into a DNA file per your `dna.yaml`:

```bash
hc dna pack workdir/dna
```

This will produce a `demo.dna` file as a sibling of the `workdir/dna` directory.

### 4. Package your DNAs into a happ file

_hApps_ (holochain apps) are bundled as aggregations of different DNAs.

1. Create a new happ workdir with `hc app init <HAPP_FOLDER>`.
  - This will create a `happ.yaml` in it with the necessary initial configuration.
2. Add the DNA bundle created in the previous step to the new `happ.yaml` file (see `workdir/happ/happ.yaml` for an example).
3. Run the following command to package your DNAs into a happ bundle per your `happ.yaml`:

```bash
hc app pack workdir/happ
```

This will produce a `demo-happ.happ` file as a sibling of the `workdir/happ` directory.

### 5. Running and testing your happ

If you are using Tryorama to run tests against your DNA, you can jump over to the [tryorama README](https://github.com/holochain/tryorama) and follow the instructions there.

If you want to run the happ bundle directly, run this replacing `workdir/happ` for the directory in which you have you `*.happ` file:

```bash
hc sandbox generate workdir/happ --run
```

which should yield something similar to this:

```
Conductor ready.
hc-sandbox: Created ["/tmp/tmp.yUYpMjGsdX/AX3rl-kBJjA4ljd3t8Nri"]

Conductor ready.
hc-sandbox: Running conductor on admin port 46455
hc-sandbox: Connected successfully to a running holochain
```

You can look at the [documentation of `hc sandbox`](https://github.com/holochain/holochain/tree/develop/crates/hc_sandbox) to learn more on how to manage sandboxes.

## Contribute
Holochain is an open source project. We welcome all sorts of participation and are actively working on increasing surface area to accept it. Please see our [contributing guidelines](/CONTRIBUTING.md) for our general practices and protocols on participating in the community, as well as specific expectations around things like code formatting, testing practices, continuous integration, etc.

* Connect with us on our [forum](https://forum.holochain.org)

# License
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

Copyright (C) 2019-2020, Holochain Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
