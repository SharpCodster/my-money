import React from 'react';
import './payees.scss';
import List from 'devextreme-react/list';

export default () => (
  <React.Fragment>
    <h2 className={'content-block'}>Payees</h2>
    <div className={'content-block'}>
      <List
          dataSource={employees}
          height="100%"
          grouped={true}
          collapsibleGroups={true}
          groupRender={GroupTemplate} />
    </div>
  </React.Fragment>
);

function GroupTemplate(item: any) {
  return <div>{item.key}</div>;
}

const employees = [{
  key: '#',
  items: ['4Books']
}, 
{
  key: 'A',
  items: ['Adobe', 'Airbnb', 'Allianz', 'Alpitour', 'Amazon', 'Aruba', 'Autodesk', 'Avis']
}, 
{
  key: 'B',
  items: ['Best Secret', 'Bimbo Store', 'Birreria Pedavena', 'Bmove', 'Booking']
}, 
{
  key: 'C',
  items: ['Carlo', 'Centromoto snc']
}, 
{
  key: 'D',
  items: ['Decathlon', 'Disney+']
}, 
{
  key: 'E',
  items: ['EasyJet', 'Eden Viaggi', 'Efarma', 'Elegant Themes', 'Emergency', 'Esatto', 'Europcar', 'Examtopics', 'Expedia']
}, 
{
  key: 'F',
  items: ['Farmae', 'Fastweb', 'Fitprime', 'Foodspring']
}, 
{
  key: 'G',
  items: ['Gashi', 'Generali', 'Genertel', 'Giarletta', 'Github', 'Giunti', 'Goran', 'Goretti Gomme', 'Grammarly', 'Grimaldi']
}, 
{
  key: 'H',
  items: ['H&M']
}, 
{
  key: 'I',
  items: ['Ikea', 'Iliad', 'Inarcassa', 'Intimissimi', 'Iperceramica']
}, 
{
  key: 'J',
  items: ['JeFIT', 'Just Eat']
}, 
{
  key: 'K',
  items: ['Kyla']
}, 
{
  key: 'M',
  items: ['Measureup', 'MIB', 'Microsoft', 'MyFitnessPal']
}, 
{
  key: 'N',
  items: ['Netflix', 'NowTv']
}, 
{
  key: 'O',
  items: ['Obi', 'Ordine Architetti', 'OVS']
}, 
{
  key: 'P',
  items: ['Pandora', 'Parri', 'Pezzolato', 'Pino', 'Pixart Printing']
}, 
{
  key: 'Q',
  items: ['Qui Conviene']
}, 
{
  key: 'R',
  items: ['Register', 'Rentalcars', 'Reti', 'Ring Alarm', 'Ruan', 'Ryanair']
}, 
{
  key: 'S',
  items: ['San Giacomo', 'San Nazario', 'Scaramelli', 'Sergas', 'SicilyByCar', 'Spehar', 'Spotify', 'Steam', 'Studio 39']
}, 
{
  key: 'T',
  items: ['Telecom', 'Telepass', 'Testprep Training', 'Treedom', 'Trenitalia', 'Trenord']
}, 
{
  key: 'U',
  items: ['Udemy', 'Unicredit', 'Unipol Sai', 'Unopiù Immobliare']
}, 
{
  key: 'V',
  items: ['Verrone', 'Via Manna', 'Vidak', 'Vittoria Mauro', 'Vodafone']
}, 
{
  key: 'W',
  items: ['Weber']
}, 
{
  key: 'Z',
  items: ['Zalando', 'Zanutta', 'Zoo Lignano']
} ];

