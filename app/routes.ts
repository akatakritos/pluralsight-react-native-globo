import { NavigationProp } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type RouteParams = {
  Home: undefined;
  Contact: undefined;
  Video: undefined;
  VideoDetail: { youtubeId: string };
  Register: undefined;
  Login: undefined;
};

export type NavFn = NavigationProp<RouteParams>['navigate'];
export type NavPropsFor<T extends keyof RouteParams> = StackScreenProps<RouteParams, T>;
