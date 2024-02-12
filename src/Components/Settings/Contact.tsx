import { Call, LocationOn } from "@mui/icons-material"
import { TextareaAutosize } from "@mui/material"
import { useUser } from "../../Context/Context";

function Contact() {

    const address = localStorage.getItem('address');
    const contact = localStorage.getItem('contact');
    const { setAddress, setContact } = useUser();

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                    <LocationOn color="primary" />
                    <h3>Address</h3>
                </div>
                <TextareaAutosize
                    placeholder="Address"
                    minRows={4}
                    maxRows={20}
                    itemType="number"
                    style={{ width: '400px', resize: 'none', outline: 'none', padding: '10px', marginTop: '10px', fontSize: '25px' }}
                    value={address || ''}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
                <div style={{ display: 'flex' }}>
                    <Call color="primary" />
                    <h3>Contact</h3>
                </div>
                <TextareaAutosize
                    placeholder="Phone Number with Country Code"
                    minRows={1}
                    style={{ width: '400px', resize: 'none', outline: 'none', padding: '5px', marginTop: '10px', fontSize: '15px' }}
                    value={contact || ''}
                    onChange={(e) => setContact(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Contact;