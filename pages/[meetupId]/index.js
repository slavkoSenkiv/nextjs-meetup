import MeetupDetail from '../../components/meetups/meetupDetail';
//import MeetupDetail from '../../pages/[meetupId]';

export default function MeetupDetails( ) {
  return (
    <MeetupDetail
      image="https://tourismmedia.italia.it/is/image/mitur/20220128114511-roma-panoramica-roma-lazio-shutterstock-1922377871-cover-1?wid=1920&hei=1320&fit=constrain,1&fmt=webp"
      title="A first meetup"
      address="Some street 5, Some City"
      description="Some meetup description"
    />
  );
}
