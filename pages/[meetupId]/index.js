import MeetupDetail from '../../components/meetups/MeetupDetail';

export default function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://tourismmedia.italia.it/is/image/mitur/20220128114511-roma-panoramica-roma-lazio-shutterstock-1922377871-cover-1?wid=1920&hei=1320&fit=constrain,1&fmt=webp"
      title="A first meetup"
      address="Some street 5, Some City"
      description="Some meetup description"
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    //if user enters anything that is not supported in the array:
    //fallback = false => means paths array contains all possible arrays => he gets 404
    //fallback = true  => nextjs will try to generate the page for this id dynamically on the server
    paths: [
      // in ideal worls this  path array of Ids has to be not hardcodded
      // but fetched from the db and generated dynamically
      { params: { meetupId: 'm1' } },
      { params: { meetupId: 'm2' } },
    ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  return {
    props: {
      meetupData: {
        image:
          'https://tourismmedia.italia.it/is/image/mitur/20220128114511-roma-panoramica-roma-lazio-shutterstock-1922377871-cover-1?wid=1920&hei=1320&fit=constrain,1&fmt=webp',
        id: meetupId,
        title: 'A first Meetup',
        address: 'some address here 123 123 123',
      },
    },
  };
}
