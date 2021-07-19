import { Orchestrator, Config, InstallAgentsHapps } from "@holochain/tryorama";
import path from "path";

const conductorConfig = Config.gen();

// Construct proper paths for your DNAs
const demoDnaPath = path.join(__dirname, "../../workdir/dna/demo-dna.dna");

// create an InstallAgentsHapps array with your DNAs to tell tryorama what
// to install into the conductor.
const installation: InstallAgentsHapps = [
  // agent 0
  [
    // happ 0
    [demoDnaPath],
  ],
];

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

const orchestrator = new Orchestrator();

orchestrator.registerScenario("sample test", async (s, t) => {
  const [alice] = await s.players([conductorConfig]);

  // install your happs into the coductors and destructuring the returned happ data using the same
  // array structure as you created in your installation array.
  const [[alice_common]] = await alice.installAgentsHapps(installation);

  let result = await alice_common.cells[0].call("numbers", "add_ten", { number: 10 });
  t.deepEqual(result, { other_number: 20 });
});

orchestrator.run();
