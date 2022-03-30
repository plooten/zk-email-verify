import _ from "lodash";

export interface IGroupMessage {
  /**
   * Plaintext string message that, combined with sshSignature, determines the group signature nullifier
   */
  topic: string;
  /**
   * If set to false, groupSig.publicSignals.nullifier will always be 0.
   * Otherwise, it will be Poseidon(PoseidonK(pubKey), opener), where opener = Poseidon(payload1, PoseidonK(priv)
   * Practically, nullifier equalling 0 means that 
   */
  enableSignerId: boolean;
  /**
   * Plaintext string message. Different from payload1 only in that it does not factor into nullifier
   */
  message: string;
  /**
   * Name of the group that you're signing as, e.g. https://github.com/orgs/doubleblind-xyz/people
   */
  groupName: string;
  /**
   * SSH public keys of members the group (may be a subset).
   * Note: Does not need to be pre-sorted as it will be sorted as part of prove & verify functions.
   */
  groupPublicKeys: string[];
}

export interface IGroupSignature {
  zkProof: object;
  groupMessage: IGroupMessage;
}

export const isGroupSignature = (o: object): o is IGroupSignature => {
return _.every(['payload1', 'payload2', 'groupKeys', 'proof', 'nullifier'].map(k => k in o));
}