import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {LogBox} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  ButtonBack,
  Container,
  ContentItem,
  Header,
  HeaderContent,
  ItemRegion,
  NameRegionText,
  Title,
  RegionText,
  TextContent,
} from './styles';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const RegionChoice: React.FC = () => {
  const route = useRoute();

  const navigation = useNavigation();

  const {changeRegion, changeRegionName} = route.params;

  const handleChangeRegion = (region: string, name: string) => {
    changeRegionName(name);
    changeRegion(region);

    navigation.goBack();
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <ButtonBack onPress={() => navigation.goBack()}>
            <Icon name="left" size={25} color="#171717" />
          </ButtonBack>
          <Title>Region</Title>
        </HeaderContent>
        <Icon name="search1" size={25} color="#171717" />
      </Header>
      <ContentItem>
        <ItemRegion onPress={() => handleChangeRegion('+55', 'Brazil')}>
          <NameRegionText>Brazil</NameRegionText>
          <TextContent>
            <RegionText>55</RegionText>
          </TextContent>
        </ItemRegion>
        <ItemRegion onPress={() => handleChangeRegion('+1', 'Canada')}>
          <NameRegionText>Canada</NameRegionText>
          <TextContent>
            <RegionText>1</RegionText>
          </TextContent>
        </ItemRegion>
        <ItemRegion onPress={() => handleChangeRegion('+33', 'France')}>
          <NameRegionText>France</NameRegionText>
          <TextContent>
            <RegionText>33</RegionText>
          </TextContent>
        </ItemRegion>
        <ItemRegion onPress={() => handleChangeRegion('+852', 'Hong Kong')}>
          <NameRegionText>Hong Kong, China</NameRegionText>
          <TextContent>
            <RegionText>852</RegionText>
          </TextContent>
        </ItemRegion>
        <ItemRegion onPress={() => handleChangeRegion('+82', 'South Korea')}>
          <NameRegionText>South, Korea</NameRegionText>
          <TextContent>
            <RegionText>82</RegionText>
          </TextContent>
        </ItemRegion>
        <ItemRegion onPress={() => handleChangeRegion('+1', 'United State')}>
          <NameRegionText>United State</NameRegionText>
          <TextContent>
            <RegionText>1</RegionText>
          </TextContent>
        </ItemRegion>
      </ContentItem>
    </Container>
  );
};

export default RegionChoice;
