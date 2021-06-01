import { Member, MemberInfo, Profile, ActiveDevice } from './models';
import { GameService } from '..';
export declare class Player {
    superThis: GameService;
    constructor(superThis: GameService);
    GetCurrentPlayer(): Promise<Member>;
    GetMemberData(memberId: string): Promise<Member>;
    GetLastLoginMemberInfo(): Promise<MemberInfo>;
    EditCurrentPlayerProfile(input: Profile): Promise<MemberInfo>;
    ChangePassword(currentPassword: string, newPassword: string): Promise<boolean>;
    GetActiveDevices(): Promise<ActiveDevice[]>;
    RevokeActiveDevice(deviceId: string): Promise<boolean>;
}
