# How to build Holochain DNA

[![Project](https://img.shields.io/badge/project-holochain-blue.svg?style=flat-square)](http://holochain.org/)
[![Forum](https://img.shields.io/badge/chat-forum%2eholochain%2enet-blue.svg?style=flat-square)](https://forum.holochain.org)
[![Chat](https://img.shields.io/badge/chat-chat%2eholochain%2enet-blue.svg?style=flat-square)](https://chat.holochain.org)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

*as of 2020-09-15*

## Steps

### 0. Build `holochain` and `dna-util`

You'll need two binaries to develop DNAs: the actual Holochain conductor binary, and the dna-util library which assists with assembling Wasms into a DNA file.

- Clone the repo: `git clone https://github.com/holochain/holochain && cd ./holochain`
- Ensure correct version of rust tool-chain via nix: `nix-shell` (this can be done by entering `nix-shell` at the root of the holochain directory.)
- Install conductor binary: `cargo install --path crates/holochain`
- Install dna-util binary: `cargo install --path crates/dna_util`

You should now have `holochain` and `dna-util` on your PATH.

### 1. Write your Zomes

Each zome is a Rust crate. See [zomes/whoami](zomes/whoami) and [zomes/foo](zomes/foo) for examples.

### 2. Build your Zomes into Wasm

When you want to (re)build your zomes into Wasm, simply run

```bash
CARGO_TARGET=target cargo build --release --target wasm32-unknown-unknown
```

and they will be available in `target/wasm32-unknown-unknown/release/`

### 3. Assemble your Wasms into a DNA file

*Note: Soon, this process will be easier in that it will not require a `.dna.workdir`*

1. Create a `demo.dna.workdir` directory (replace "demo" with whatever you want)
2. Create a `demo.dna.workdir/dna.json` file which references the `*.wasm` files you built in the previous step. See the [dna.json](dna.json) file in this repo for an example.
  - Note: this is a bit hacky right now. Normally when using a dna.workdir, you would include the Wasms alongside the `dna.json` in the same directory. However, it is easier for the purposes of this tutorial to let the `dna.json` reference Wasms in a different directory. The workdir construct becomes more useful when you need to go back and forth between an already-built DNA and its constituent Wasms.
3. Run the following command to assemble your Wasms into a DNA file per your dna.json:

```bash
dna-util -c demo.dna.workdir
```

This will produce a `demo.dna.gz` file as a sibling of the `demo.dna.workdir` directory.

### 4. Use the Conductor's admin interface to install your DNA

If you are using Tryorama to run tests against your DNA, you can jump over to the [tryorama README](https://github.com/holochain/tryorama-rsm) and follow the instructions there.

If you are running Holochain using your own setup, you'll have to have a deeper understanding of Holochain than is in scope for this tutorial. Roughly speaking, you'll need to:

- make sure `holochain` is running with a configuration that includes an admin interface websocket port
- send a properly encoded [`InstallApp`](https://github.com/holochain/holochain/blob/66ca899d23842cadebc214d591475987f4af4f43/crates/holochain/src/conductor/api/api_external/admin_interface.rs#L240) command over the websocket
- be sure to `ActivateApp` and `AttachAppInterface` as well.

If you just want to run an instance of `holochain` with your DNA running for development purposes, you can use [`holochain-run-dna`](https://www.npmjs.com/package/@holochain-open-dev/holochain-run-dna).

## Contribute
Holochain is an open source project.  We welcome all sorts of participation and are actively working on increasing surface area to accept it.  Please see our [contributing guidelines](/CONTRIBUTING.md) for our general practices and protocols on participating in the community, as well as specific expectations around things like code formatting, testing practices, continuous integration, etc.

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
