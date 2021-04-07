import React, { useState } from 'react'
import { IoMdClose} from 'react-icons/io'
import { AiOutlineExclamationCircle} from 'react-icons/ai'
import {
    Container, 
    Header, 
    Title,
    Content,
    Label,
    Button,
    InputContact,
    ContentInput,
    SelectRegion,
    OptionRegion,
    Info,
    Optional
} from './styles'
import { useAuth } from '../../hooks/Auth'
import firebaseApp from '../../firebase'

const NewChat = (props) => {

    const [openInfo, setOpenInfo] = useState(false)
    const [region, setRegion] = useState('+55');
    const [phone, setPhone] = useState('');
    const [nameFriend, setNameFriend] = useState('');

    const { user} = useAuth()
    const {db , firebase} = firebaseApp()


    const AddFriendOnList = (phoneNumber) => {
        db.collection('users')
          .doc(`${phoneNumber}`)
          .get()
          .then(async doc => {
            const {phone, region, name, avatar} = doc.data();
    
            user.friends.map(e => {
              if (e.phone === phone) {
                return alert(`${e.name} já é seu amigo!!`);
              }
            });

            await db
              .collection('users')
              .doc(`${user.region}${user.phone}`)
              .update({
                friends: firebase.firestore.FieldValue.arrayUnion({
                  name: nameFriend ? nameFriend : name,
                  avatar: avatar,
                  region: region,
                  phone: phone,
                }),
              });
    
            await db
              .collection('users')
              .doc(`${phoneNumber}`)
              .update({
                friends: firebase.firestore.FieldValue.arrayUnion({
                  name: user.name,
                  avatar: user.avatar,
                  region: user.region,
                  phone: user.phone,
                }),
              });

            back()
        
          });
      };

      const back = () => {
        props.setShow(false)
      }


    return (
        <Container style={{left: props.show ? 0 : '-25%'}}>
            <IoMdClose
                onClick={() => props.setShow(false)}
                size={29} 
                color="#2a2a2e" 
                style={{cursor: 'pointer', position: 'absolute', left: 25, top: 35}} />
            <Header>
                <Title>Add to friend</Title>
            </Header>
            <Content>
            <ContentInput>
                    <Label>Name</Label>
                    <InputContact
                        value={nameFriend} 
                        onChange={(e) => setNameFriend(e.target.value)}
                        placeholder="Eric Clapson"/>
                    <Optional>Optional</Optional>
                </ContentInput>
                <ContentInput>
                    <Label>Region</Label>
                    <SelectRegion value={region} onChange={(e) => setRegion(e.target.value)}>
                        <OptionRegion value="+55">Brazil (+55)</OptionRegion>
                        <OptionRegion value="+1">United State (+1)</OptionRegion>
                        <OptionRegion value="+351">Portugal (+351)</OptionRegion> 
                    </SelectRegion>
                </ContentInput>
                <ContentInput>
                    <Label>Phone</Label>
                    <InputContact
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile number" />
                    <AiOutlineExclamationCircle 
                    size={22} 
                    onMouseOver={() => setOpenInfo(true)}
                    onMouseLeave={() => setOpenInfo(false)}
                    color='#58c434'
                    />
                    {openInfo && (
                        <Info>
                            <p>Ex: 81986069071</p>
                        </Info>
                    )}
                </ContentInput>
                <Button onClick={() => AddFriendOnList(`${region}${phone}`)}>Save</Button>
            </Content>
        </Container>
    )
}

export default NewChat