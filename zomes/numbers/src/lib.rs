use hdk::prelude::*;

#[derive(Serialize, Deserialize, SerializedBytes, Debug, Clone)]
pub struct ZomeInput {
    pub number: i32,
}

// data we want back from holochain
#[derive(Serialize, Deserialize, SerializedBytes, Debug, Clone)]
pub struct ZomeOutput {
    pub other_number: i32,
}

#[hdk_extern]
pub fn foo(input: ZomeInput) -> ExternResult<ZomeOutput> {
    Ok(ZomeOutput {
      other_number: input.number + 10
    })
}