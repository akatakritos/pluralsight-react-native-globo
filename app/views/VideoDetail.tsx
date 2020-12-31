import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationInjectedProps } from 'react-navigation';

interface VideoDetailProps extends NavigationInjectedProps {}

export const VideoDetail: FC<VideoDetailProps> = (props) => {
  const youtubeId = props.navigation.getParam('youtubeId', 'NO VIDEO');
  const url = `https://www.youtube.com/embed/${youtubeId}`;
  console.log(url);
  return (
    <View style={{ paddingTop: 40 }}>
      <WebView style={{ marginTop: 20 }} javaScriptEnabled={true} source={{ uri: url }}></WebView>
      <Text>{url}</Text>
    </View>
  );
};

(VideoDetail as any).navigationOptions = {
  headerShown: false,
};
