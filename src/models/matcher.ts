import { CityProfile } from './cityprofile';
import { UserProfile } from './userprofile';

export interface ProfileMatcher {
    userprofile: UserProfile;
    cityprofiles: CityProfile[];
}
