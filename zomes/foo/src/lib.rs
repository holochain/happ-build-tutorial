use hdk::prelude::*;

#[hdk_extern]
pub fn foo(_: ()) -> ExternResult<String> {
    Ok(String::from("foo"))
}