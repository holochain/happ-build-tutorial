let 
  holonixPath = builtins.fetchTarball {
    url = "https://github.com/holochain/holonix/archive/f8bf0836b83ec6515e9da66a29302f18d298bbfa.tar.gz";
    sha256 = "1y3ligglx22yigjlhv0sman24arz2dqilrprp1nlnz5r02xsl13d";
  };
  holonix = import (holonixPath) {
    includeHolochainBinaries = true;
    holochainVersionId = "custom";
    
    holochainVersion = { 
     rev = "d3a61446acaa64b1732bc0ead5880fbc5f8e3f31";
     sha256 = "0k1fsxg60spx65hhxqa99nkiz34w3qw2q4wspzik1vwpkhk4pwqv";
     cargoSha256 = "0fz7ymyk7g3jk4lv1zh6gbn00ad7wsyma5r7csa88myl5xd14y68";
     bins = {
       holochain = "holochain";
       hc = "hc";
     };
    };
  };
in holonix.main
