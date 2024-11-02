
import {
    useWallet,
    SuiChainId,
    useSuiClient,
} from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { Transaction } from "@mysten/sui/transactions";
import { useMemo } from "react";

const sampleNft = new Map([
    [
      "sui:devnet",
      "0x7e4dc9e4d61f69aa3f07edc58df0ec54298296cdd489c6748f656c8cd72e659f::oyster_game::Oyster",
    ],
    [
      "sui:testnet",
      "0x5ea6aafe995ce6506f07335a40942024106a57f6311cb341239abf2c3ac7b82f::nft::mint",
    ],
    [
      "sui:mainnet",
      "0x7e4dc9e4d61f69aa3f07edc58df0ec54298296cdd489c6748f656c8cd72e659f::nft::mint",
    ],
  ]);


class MintOyster {
    wallet = useWallet();
    client = useSuiClient();

    getDomain() {
        return this.wallet
    }
    nftContractAddr = useMemo(() => {
        if (!this.wallet.chain) return "";
        return sampleNft.get(this.wallet.chain.id) ?? "";
      }, [this.wallet]);

    async handleSignAndExecuteTransaction(
        target: string | undefined,
        opts?: {
            isCustomExecution?: boolean;
        }
    ) {
        if (!target) return;
        try {
            const tx = new Transaction();
            tx.setGasBudget(100000000),
            tx.moveCall({
                target: target,
                arguments: [
                    tx.pure.string("Suiet NFT"),
                    tx.pure.string("Suiet Sample NFT"),
                    tx.pure.string('0x8'), // Random generator object
                    tx.pure.string('https://api-mainnet.suifrens.sui.io/suifrens/0x21213e8306d052133b81c5b7d80a11d23f38e4dd2a2c5b26c96c2ef99915a833/svg'),
                ],
            });

            if (!opts?.isCustomExecution) {
                const resData = await this.wallet.signAndExecuteTransaction({
                    transaction: tx,
                });
                console.log("signAndExecuteTransaction success", resData);
            } else {
                const resData = await this.wallet.signAndExecuteTransaction(
                    {
                        transaction: tx,
                    },
                    {
                        execute: async ({ bytes, signature }) => {
                            return await this.client.executeTransactionBlock({
                                transactionBlock: bytes,
                                signature: signature,
                                options: {
                                    showRawEffects: true,
                                    showObjectChanges: true,
                                },
                            });
                        },
                    }
                );
                console.log("signAndExecuteTransaction success", resData);
                return resData;
            }
        } catch (e) {
            console.error("executeMoveCall failed", e);
        }
    }

    chainName(chainId: string | undefined) {
        switch (chainId) {
            case SuiChainId.MAIN_NET:
                return "Mainnet";
            case SuiChainId.TEST_NET:
                return "Testnet";
            case SuiChainId.DEV_NET:
                return "Devnet";
            default:
                return "Unknown";
        }
    };
}

export default MintOyster;
