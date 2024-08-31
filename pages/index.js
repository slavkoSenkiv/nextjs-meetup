import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

/* const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A first Meetup',
    image:
      'https://tourismmedia.italia.it/is/image/mitur/20220128114511-roma-panoramica-roma-lazio-shutterstock-1922377871-cover-1?wid=1920&hei=1320&fit=constrain,1&fmt=webp',
    address: 'some address here 123 123 123',
    description: '1st',
  },
  {
    id: 'm2',
    title: 'A 2d Meetup',
    image:
      'https://tourismmedia.italia.it/is/image/mitur/20220128114511-roma-panoramica-roma-lazio-shutterstock-1922377871-cover-1?wid=1920&hei=1320&fit=constrain,1&fmt=webp',
    address: 'some address here 123 123 123',
    description: '2d',
  },
  {
    id: 'm3',
    title: 'A 3d Meetup',
    image:
      'https://tourismmedia.italia.it/is/image/mitur/20220128114511-roma-panoramica-roma-lazio-shutterstock-1922377871-cover-1?wid=1920&hei=1320&fit=constrain,1&fmt=webp',
    address: 'some address here 123 123 123',
    description: '23d',
  },
]; */

export default function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

/* export function getServerSideProps(context) {
  // fetch data from API
  // it alwats run on server side

  const req = context.req;
  const res = context.res;
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
} */

export async function getStaticProps() {
  // executes during the build process
  // the code here will never appear in the client browser
  // props returned here go to props of the page component props
  const client = await MongoClient.connect(process.env.DB_URL);

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
