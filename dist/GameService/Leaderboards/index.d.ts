import { Leaderboard, SubmitScoreResponse, LeaderBoardDetails, Score } from './models';
import { GameService } from '..';
export declare class Leaderboards {
    superThis: GameService;
    constructor(superThis: GameService);
    GetLeaderBoards(): Promise<Leaderboard[]>;
    SubmitScore(leaderboardId: string, score: number): Promise<SubmitScoreResponse>;
    GetLeaderBoardDetails(leaderboardId: string, skip?: number, limit?: number): Promise<LeaderBoardDetails>;
    GetCurrentPlayerScore(leaderboardId: string): Promise<Score>;
}
