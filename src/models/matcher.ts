import { CityProfile } from './city-profile';
import { UserProfile } from './user-profile';

export interface ProfileMatcher {
    userProfile: UserProfile;
    cityProfiles: CityProfile[];
}
