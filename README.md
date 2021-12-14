# How to build a hApp (Holochain App): The Basics

[![Project](https://img.shields.io/badge/project-holochain-blue.svg?style=flat-square)](http://holochain.org/)
[![Forum](https://img.shields.io/badge/chat-forum%2eholochain%2enet-blue.svg?style=flat-square)](https://forum.holochain.org)
[![Chat](https://img.shields.io/badge/chat-chat%2eholochain%2enet-blue.svg?style=flat-square)](https://chat.holochain.org)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

_This README last updated: 2021-07-18_

> Holochain revision: [363af6d8af8d18e4616f6aa56ad4d1f0fabaafb7 May 21, 2021](https://github.com/holochain/holochain/commits/363af6d8af8d18e4616f6aa56ad4d1f0fabaafb7)

> HDK version: [0.0.112](https://docs.rs/hdk/0.0.112/hdk/)

> This project has a complementary guide at the ["call your hApp tutorial"](https://github.com/holochain/happ-client-call-tutorial), and interacts with that code via a clean separation at the "network layer". This project is called by that project over a Websocket based network connection.

Welcome to this project here to help you build and run your first hApp! It covers the very basics only. If you haven't previously read the article on ["Application Architecture" on the developer documentation](https://developer.holochain.org/concepts/2_application_architecture/) it could be helpful to do so now, or at any point during this tutorial.

## Important documentation

- [HC CLI docs](https://github.com/holochain/holochain/blob/363af6d8af8d18e4616f6aa56ad4d1f0fabaafb7/crates/hc/README.md)
- [HDK docs](https://docs.rs/hdk/0.0.112/hdk/)

## Steps

### 0. Install nix-shell

1. If you haven't yet, install the [nix-shell](https://developer.holochain.org/docs/install/#install-the-nix-package-manager).

> Note that you don't need to do the `nix-shell https://holochain.love` step, since in this repository we provide an example `default.nix` file that provides the appropriate versions for the binaries that you will need.

2. Activate the holochain cachix with:

```bash
nix-env -iA cachix -f https://cachix.org/api/v1/install
cachix use holochain-ci
```

3. Enter the nix-shell for this repository by running `nix-shell .` in this folder. This will take a long time in the first run.
   - Verify everything is working fine with `holochain -V` and `hc -V`.

### 1. Write your Zomes

Each zome is a Rust crate. See [zomes/whoami](zomes/whoami) and [zomes/numbers](zomes/numbers) for examples. For a more complete list of examples of a wide spectrum of functionality of Holochain and the HDK, check out [this folder of examples from Holochain](https://github.com/holochain/holochain/tree/hdk-0.0.112/crates/test_utils/wasm/wasm_workspace).

### 2. Build your Zomes into WebAssembly (WASM)

When you want to build your zomes into WebAssembly (wasm), simply run

```bash
CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown
```

and they will be available in `target/wasm32-unknown-unknown/release/`.

> You will have to rerun this any time you redo step 1 (edit your Zomes).

### 3. Package your "Wasms" into a DNA file

   1. Create a new dna workdir with `hc dna init <DNA_FOLDER>`. This will create a `dna.yaml` in it with the necessary initial configuration.
   2. Add your zomes to the `dna.yaml` file with references the `*.wasm` files you built in the previous step (see [workdir/dna/dna.yaml](workdir/dna/dna.yaml) for examples).
   3. Run the following command to package your Wasms into a DNA file per your `dna.yaml`:
```bash
hc dna pack workdir/dna
```

This will produce a `demo.dna` file as a sibling of the `workdir/dna` directory.
> You will have to rerun step 3.3 (hc dna pack) of this step any time you redo primary step 2 (change and rebuild your Wasms).

### 4. Package your DNAs into a happ file

_hApps_ (holochain apps) are bundled as aggregations of different DNAs.

1. Create a new happ workdir with `hc app init <HAPP_FOLDER>`. This will create a `happ.yaml` in it with the necessary initial configuration.
2. Add the DNA bundle created in the previous step to the new `happ.yaml` file (see [workdir/happ/happ.yaml](workdir/happ/happ.yaml) for an example).
3. Run the following command to package your DNAs into a happ bundle per your `happ.yaml`:
```bash
hc app pack workdir/happ
```

This will produce a `demo-happ.happ` file as a child file in the `workdir/happ` directory.
> You will have to rerun steo 4.3 (hc app pack) of this step any time you redo primary step 3 (change and rebuild your Dna).

### 5. Testing

To run the tryorama tests, make sure you have built the `.happ` file as specified in the steps above and then execute these commands:

```bash
cd tests
npm install
npm test
```

This will output something similar to this:

```bash
11:00:17 info:
☸☸☸ [[[CONDUCTOR c0]]]
☸ Conductor ready.
☸
11:00:17 [tryorama] info: Conductor 'c0' process spawning completed.
App Port spun up on port  46587
ok 1 should be strictly equal
11:00:20 [tryorama] info: conductor 'c0' exited with code null
FIXME: ignoring onLeave

1..1
# tests 1
# pass  1

# ok
```

You can look at [tests/src/index.ts](tests/src/index.ts) and have a look at the tests. You can also look at the [tryorama documentation](https://github.com/holochain/tryorama).

> If you make edits to your Zomes (step 1), you will need to perform steps 2 and 3 again in order for the changes to be reflected in the running of your tests, since it looks at the packed DNA file.

### 6. Running your happ

To run the happ bundle directly, execute this command replacing `workdir/happ` for the directory in which you have your `*.happ` file:

```bash
hc sandbox generate workdir/happ --run=8888
```

which should yield something similar to this:

```
hc-sandbox: Created config at /tmp/tmp.2Vg2Ml2jO6/io6SQmBmBRX3oBroT0YkG/conductor-config.yaml

Conductor ready.
hc-sandbox: Created ["/tmp/tmp.2Vg2Ml2jO6/io6SQmBmBRX3oBroT0YkG"]

Conductor ready.
hc-sandbox: Running conductor on admin port 45843
hc-sandbox: Attaching app port 8888
hc-sandbox: App port attached at 8888
hc-sandbox: Connected successfully to a running holochain
```

Now you'll have holochain waiting with an [AppInterface](https://github.com/holochain/holochain/blob/363af6d8af8d18e4616f6aa56ad4d1f0fabaafb7/crates/holochain_conductor_api/src/app_interface.rs#L5-L130) for a connection at port 8888. You also have holochain waiting with an [AdminInterface](https://github.com/holochain/holochain/blob/363af6d8af8d18e4616f6aa56ad4d1f0fabaafb7/crates/holochain_conductor_api/src/admin_interface.rs#L8-L386) on port (subject to vary) 45843 as mentioned in the logs.

Now that you're here, you can connect to the app interface from a client and call your Zome functions! How to do so is covered elsewhere, including a companion tutorial specifically compatible with this repository called ["How to call your hApp"](https://github.com/holochain/happ-client-call-tutorial). There are libraries for helping from different languages, such as [javascript](https://github.com/holochain/holochain-conductor-api) and [Rust](https://github.com/holochain/conductor-client-rust), but it is entirely possible from other languages with Websockets functionality, if you follow the protocol.

> If you have rerun step 4 (rebuilt your hApp) and you are prepared to lose any data in your sandbox, stop the process and run `hc sandbox clean`, then rerun the step 6 command to have a fresh sandbox with your updated hApp.

You can look at the [documentation of `hc sandbox`](https://github.com/holochain/holochain/blob/363af6d8af8d18e4616f6aa56ad4d1f0fabaafb7/crates/hc_sandbox/README.md) to learn more on how to manage sandboxes. For a quick helper: in case you shut down your running conductor, you can start it again using `hc sandbox run`.

> Note: `hc sandbox` and its derivates are at a prototype stage and subject to change.

## Next steps

Here you have useful documentation for holochain core utilities:

- [Core Concepts](https://developer.holochain.org/docs/concepts/)
- [HDK documentation](https://docs.rs/hdk/0.0.112/hdk/)
- [HDK usage examples](https://github.com/holochain/holochain/tree/hdk-0.0.112/crates/test_utils/wasm/wasm_workspace)
- [Tryorama documentation](https://github.com/holochain/tryorama)
- [Conductor API](https://github.com/holochain/holochain-conductor-api)

Here you can find useful resources:

- [Help & How To Wiki](https://github.com/holochain-open-dev/wiki/wiki): community contributed how tos and explainers
- [Holochain Gym](https://holochain-gym.github.io/): a step-by-step collection of exercises to get you started in holochain development.
- [Acorn](https://github.com/h-be/acorn): the most complete holochain application up-to-date, full-stack.
- [Holochain Open Dev](https://github.com/holochain-open-dev): collection of small holochain modules.
- [RSM playtime](https://www.youtube.com/watch?v=u6iUg1BVzsY&list=PLOuXrtFJO6zWNK41Wgv62v5ju5CP3FbOT): deep dive video series on holochain rsm.

## Contribute

Holochain is an open source project. We welcome all sorts of participation and are actively working on increasing surface area to accept it. Please see our [contributing guidelines](/CONTRIBUTING.md) for our general practices and protocols on participating in the community, as well as specific expectations around things like code formatting, testing practices, continuous integration, etc.

- Connect with us on our [forum](https://forum.holochain.org)

# License

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

Copyright (C) 2019-2021, Holochain Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
