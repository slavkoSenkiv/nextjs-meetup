import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

export default function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.DB_URL);

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    //if user enters anything that is not supported in the array:
    //fallback = false => means paths array contains all possible arrays => he gets 404
    //fallback = true  => nextjs will try to generate the page for this id dynamically on the server
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // in ideal worls this  path array of Ids has to be not hardcodded
    // but fetched from the db and generated dynamically
    // [{ params: { meetupId: 'm1' } },
    // { params: { meetupId: 'm2' } }]
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(process.env.DB_URL);

  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetupIdObject = new ObjectId(meetupId);

  const selectedMeetup = await meetupsCollection.findOne({
    _id: meetupIdObject,
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
