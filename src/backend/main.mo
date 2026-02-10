import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";



actor {
  module DomainName {
    public type IllegalDomainName = {
      #ValidationError : Text;
    };
  };

  public shared ({ caller }) func deployApp(domainName : Text) : async () {
    switch (validateDomainName(domainName)) {
      case (null) {};
      case (?err) {
        Runtime.trap(err);
      };
    };
  };

  func validateDomainName(domainName : Text) : ?Text {
    let size = domainName.size();
    if (size < 5 or size > 50) {
      return ?("Domain name must have a length between 5 and 50 characters. Current length is " # size.toText());
    };

    let illegalChar = domainName.chars().find(
      func(c) {
        if (c >= 'a' and c <= 'z') { false } // Allow lowercase letters.
        else if (c >= 'A' and c <= 'Z') { false } // Allow uppercase letters.
        else if (c >= '0' and c <= '9') { false } // Allow numbers.
        else { c != '-' }; // Only allow hyphens.
      }
    );

    switch (illegalChar) {
      case (null) { null };
      case (?char) {
        ?("Domain name contains illegal character: " # char.toText() # ". Only letters, numbers, and hyphens are allowed.");
      };
    };
  };
};
