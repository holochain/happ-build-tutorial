use hdk::prelude::*;

// returns the current agent info
#[hdk_extern]
fn whoami(_: ()) -> ExternResult<AgentInfo> {
    Ok(agent_info()?)
}
