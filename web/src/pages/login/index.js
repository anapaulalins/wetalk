import React, { useState } from 'react'
import { useHistory} from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import {
    Container, 
    Title, 
    Content, 
    SelectRegion, 
    OptionRegion, 
    Label, 
    ContainerDiv,
    Background,
    ContentDivs,
    Button, 
    TextButton,
    Containerdivs,
    TextVerify, 
    ContainerVerify,
    ButtonClose,
    Input
} from './styles'
import { useAuth } from '../../hooks/Auth'

const Login = () => {

    const history = useHistory()
    const [region, setRegion] = useState('+55')
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')

    const { signInWithPhoneNumber, logon, loading ,enabled } = useAuth()

    return (
        <Container>
            <ButtonClose onClick={() => history.push('/')}>
                <FaTimes size={25} color="#2a2a2e"/>
            </ButtonClose>
            <Content>
               <Containerdivs>
                <Title>Log In Via Mobile Number</Title>
                    <ContentDivs>
                        <ContainerDiv>
                            <Label>Region</Label>
                            <SelectRegion value={region} onChange={(e) => setRegion(e.target.value)}>
                                <OptionRegion value="+55">Brazil (+55)</OptionRegion>
                                <OptionRegion value="+1">United State (+1)</OptionRegion>
                                <OptionRegion value="+351">Portugal (+351)</OptionRegion>
                            </SelectRegion>
                        </ContainerDiv>
                        <ContainerDiv>
                            <Label>Phone</Label>
                            <Input 
                                placeholder="Enter mobile number" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}/>
                        </ContainerDiv>
                        {enabled && (
                            <ContainerVerify>
                                <TextVerify>Enter the code sent to your phone</TextVerify>
                                <ContainerDiv>
                                    <Label>Code</Label>
                                    <Input 
                                        placeholder="Authentication code"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </ContainerDiv>
                            </ContainerVerify>
                        )}
                    </ContentDivs>
               </Containerdivs>
               <Button
               id="recaptcha-container"
               onClick={() => signInWithPhoneNumber(`${region}${phone}`)} 
               disabled={enabled}
               style={{backgroundColor: enabled ? '#e1e1e1' : '#58c434'}} >
                   {loading ? (
                       <TextButton  style={{color:'#fff'}}>Loading...</TextButton>
                   ) : (
                    <TextButton  style={{color: enabled ? '#b1acac' : '#fff'}}>Verify phone number</TextButton>
                   )}
               </Button>

               <Button
               onClick={() => logon(code)} 
               disabled={!enabled}
               style={{backgroundColor: enabled ? '#58c434' : '#e1e1e1'}} >
                   <TextButton style={{color: enabled ? '#fff' : '#b1acac'}}>Next</TextButton>
               </Button>
            </Content>
            <Background />
        </Container>
    )
}


export default Login