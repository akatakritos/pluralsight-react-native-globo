import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavPropsFor, RouteParams } from '../routes';

type Props = {} & NavPropsFor<'VideoDetail'>;

export const VideoDetail: FC<Props> = (props) => {
  const youtubeId = props.route.params.youtubeId;
  const url = `https://www.youtube.com/embed/${youtubeId}`;

  return (
    <View style={{ paddingTop: 40 }}>
      <WebView style={{ marginTop: 20 }} javaScriptEnabled={true} source={{ uri: url }}></WebView>
      <Text>{url}</Text>
    </View>
  );
};
