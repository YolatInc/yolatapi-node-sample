import { ApiHelper } from "../Helpers/apiHandler";
import { ITransactionService } from "../Interfaces/ITransactionService";
import { YOLAT_API_ROUTES } from "../Utils/Enum";

export class TransactionService {
  static async payout(payload: ITransactionService): Promise<string> {
    try {
      const apiRequest = new ApiHelper();
      const signedTransaction = await apiRequest.postData(
        YOLAT_API_ROUTES.PAYOUT,
        payload
      );
      return signedTransaction;
    } catch (error: any) {
      throw new Error(`Failed to do transaction: ${error}`);
    }
  }

  static async payoutNoWallet(payload: ITransactionService): Promise<string> {
    try {
      const apiRequest = new ApiHelper();
      const signedTransaction = await apiRequest.postData(
        YOLAT_API_ROUTES.PAYOUT_NO_WALLET,
        payload
      );
      return signedTransaction;
    } catch (error: any) {
      throw new Error(`Failed to do transaction: ${error}`);
    }
  }
  static async payoutFromWallet(payload: ITransactionService): Promise<string> {
    try {
      const apiRequest = new ApiHelper();
      const signedTransaction = await apiRequest.postData(
        YOLAT_API_ROUTES.PAYOUT_FROM_WALLET,
        payload
      );
      return signedTransaction;
    } catch (error: any) {
      throw new Error(`Failed to do transaction: ${error}`);
    }
  }
}
