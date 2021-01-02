import React, { FC } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { NavigationInjectedProps } from 'react-navigation';
import { Loader, useLoadingState } from '../LoadingState';
import { searchVideos } from './youtube-client';

interface VideoProps extends NavigationInjectedProps {}

export const Video: FC<VideoProps> = (props) => {
  const videos = useLoadingState(
    (controller) => searchVideos('react native', controller).then((result) => result.items),
    []
  );

  const handlePress = (youtubeId: string) => {
    props.navigation.navigate('VideoDetail', { youtubeId });
  };

  return (
    <View>
      <Loader
        state={videos}
        resolved={(items) => (
          <View style={{ paddingTop: 30 }}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id.videoId}
              renderItem={({ item }) => (
                <TubeItem
                  key={item.id.videoId}
                  id={item.id.videoId}
                  title={item.snippet.title}
                  imageSrc={item.snippet.thumbnails.high.url}
                  onPress={() => handlePress(item.id.videoId)}
                />
              )}
            />
          </View>
        )}
        rejected={(err) => <Text>{err}</Text>}
        loading={() => (
          <View style={{ paddingTop: 30 }}>
            <Text>LOADING</Text>
          </View>
        )}
      />
    </View>
  );
};

(Video as any).navigationOptions = {
  headerShown: false,
};

const TubeItem: FC<{ id: string; title: string; imageSrc: string; onPress: () => void }> = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={{ paddingTop: 20, alignItems: 'center' }}>
        <Image style={{ width: '100%', height: 200 }} source={{ uri: props.imageSrc }} />
        <Text>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
