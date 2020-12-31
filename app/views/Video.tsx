import React, { FC, useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { NavigationInjectedProps } from 'react-navigation';
import { Item } from './models';
import { searchVideos } from './youtube-client';

interface VideoProps extends NavigationInjectedProps {}
export const Video: FC<VideoProps> = (props) => {
  const [listLoaded, setListLoaded] = useState(false);
  const [videos, setVideos] = useState([] as Item[]);

  useEffect(() => {
    searchVideos('react native')
      .then((data) => {
        setListLoaded(true);
        setVideos(Array.from(data.items));
      })
      .catch((err) => console.error(err));
  }, []);

  const handlePress = (youtubeId: string) => {
    console.log('navigate to ', youtubeId);
    props.navigation.navigate('VideoDetail', { youtubeId });
  };

  return (
    <View>
      {listLoaded ? (
        <View style={{ paddingTop: 30 }}>
          <FlatList
            data={videos}
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
      ) : (
        <View style={{ paddingTop: 30 }}>
          <Text>LOADING</Text>
        </View>
      )}
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
