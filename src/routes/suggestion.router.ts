import { suggestionController } from '@/controllers';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import express from 'express'

const suggestionRouter = express.Router();

suggestionRouter.post(
    "/",
    ClerkExpressRequireAuth(),
    suggestionController.suggestionCreateValidator(),
    suggestionController.suggestionCreate
);

suggestionRouter.get(
    "/:userId",
    ClerkExpressRequireAuth(),
    suggestionController.getSuggestionByUserValidator(),
    suggestionController.getSuggestionByUser
);

suggestionRouter.get(
    "/titleName/:titleName",
    ClerkExpressRequireAuth(),
    suggestionController.getSuggestionByTitleValidator(),
    suggestionController.getSuggestionByTitle
);

suggestionRouter.post(
    "/voteCount",
    ClerkExpressRequireAuth(),
    suggestionController.suggestionIncreaseVoteCountValidator,
    suggestionController.suggestionIncreaseVoteCount
  );

export default suggestionRouter;