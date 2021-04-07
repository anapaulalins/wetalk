import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #ededed;
`;

export const Header = styled.View`
  margin-top: 50px;
  border-bottom-color: #ddd;
  border-bottom-width: 1px;
  padding-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  padding-bottom: 15px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonBack = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;

export const Title = styled.Text`
  color: #171717;
  font-size: 19px;
  margin-left: 10px;
  font-weight: 700;
`;

export const ContentItem = styled.View`
  margin-top: 20px;
  width: 100%;
`;

export const ItemRegion = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 5px;
`;

export const NameRegionText = styled.Text`
  color: #171717;
  font-size: 16px;
`;

export const TextContent = styled.View`
  background-color: #ddd;
  width: 35px;
  height: 30px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const RegionText = styled.Text`
  color: #999;
  font-size: 13px;
`;
