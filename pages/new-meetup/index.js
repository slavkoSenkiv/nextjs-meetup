import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

export default function NewMeetupPage() {
  const router = useRouter()

  async function addMeetupHandler(enteredMeetupData) {

    const responce = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await responce.json();

    console.log(enteredMeetupData);

    router.push('/')
    //router.replace('/') does the same but in a way that user can't go back with back button
    
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler}/>
}