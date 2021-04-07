import React, { useState } from 'react'
import { useHistory} from 'react-router-dom'
import { FaTimes , FaCamera, FaUser} from 'react-icons/fa'
import {
    Container , 
    Content, 
    Background, 
    ContainerDiv, 
    Label, 
    SelectRegion, 
    OptionRegion,
    Containerdivs,
    ContentDivs,
    ButtonClose,
    Title,
    Input,
    Button,
    TextButton,
    ContainerVerify,
    TextVerify,
    AvatarInput,
    ContentAvatar,
    ContentImage
} from './styles'


const SingUp = () => {

    const history = useHistory()
    const [confirm, setConfirm] = useState(false);
    const [avatar, setAvatar] = useState('')

    const  handleImageChange = e => {
        
        const file = new FileReader()

        file.readAsDataURL(e.target.files[0])

        file.onloadend = (e) => setAvatar(file.result)
    }

    console.log(avatar)

    return (
        <Container>
            <ButtonClose onClick={() => history.push('/')}>
                <FaTimes size={25} color="#2a2a2e"/>
            </ButtonClose>
            <Background />
            <Content>
                <Containerdivs>
                <Title>Sign up by phone number</Title>
                    <ContentDivs>
                        <ContainerDiv>
                            <Label>Name</Label>
                            <Input placeholder="John Appleseed"/>
                        </ContainerDiv>
                        <ContainerDiv>
                            <Label>Region</Label>
                            <SelectRegion>
                                <OptionRegion value="+55">Brazil (+55)</OptionRegion>
                                <OptionRegion value="+1">United State (+1)</OptionRegion>
                                <OptionRegion value="+351">Portugal (+351)</OptionRegion>
                            </SelectRegion>
                        </ContainerDiv>
                        <ContainerDiv>
                            <Label>Phone</Label>
                            <Input placeholder="Enter mobile number"/>
                        </ContainerDiv>
                        {confirm && (
                            <ContainerVerify>
                                <TextVerify>Enter the code sent to your phone</TextVerify>
                                <ContainerDiv>
                                    <Label>Code</Label>
                                    <Input placeholder="Authentication code"/>
                                </ContainerDiv>
                            </ContainerVerify>
                        )}
                    <ContentAvatar>
                        <AvatarInput>
                            {avatar ? (
                                <img src={avatar} alt="" />
                            ) : (
                                <ContentImage>
                                    <FaUser size={30} color="#696969" />
                                </ContentImage>
                            )}
                            <label htmlFor="avatar">
                                <FaCamera />
                                <input type="file" id="avatar" onChange={handleImageChange} />
                            </label>
                        </AvatarInput>
                    </ContentAvatar>
                    </ContentDivs>
                </Containerdivs>
                <Button
               onClick={() => console.log('Okay')} 
               disabled={confirm}
               style={{backgroundColor: confirm ? '#e1e1e1' : '#58c434'}}>
                   <TextButton style={{color: confirm ? '#b1acac' : '#fff'}}>Verify phone number</TextButton>
               </Button>

                <Button
               onClick={() => console.log('Okay')} 
               disabled={!confirm}
               style={{backgroundColor: confirm ? '#58c434' : '#e1e1e1'}} >
                   <TextButton style={{color: confirm ? '#fff' : '#b1acac'}}>Next</TextButton>
               </Button>
            </Content>
            
        </Container>
    )
}


export default SingUp