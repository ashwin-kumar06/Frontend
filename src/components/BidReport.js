import React from "react"; 
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'; 

const styles = StyleSheet.create({ 
  page: { 
    flexDirection: 'column', 
    padding: 10, 
  }, 
  section: { 
    margin: 10, 
    padding: 10, 
    flexGrow: 1, 
  }, 
}); 
 
const BidReport = ({ biddings, myProducts }) => ( 
  <Document> 
    <Page size="A4" style={styles.page}> 
      <View style={styles.section}> 
        <Text>Your Bidding Report</Text>  
        {biddings.map((bid, i) => ( 
          <View key={i}> 
            <Text>Title: {myProducts[i] && myProducts[i].title}</Text> 
            <Text>Amount: {bid.bidAmount}</Text> 
            <Text>--------------------------------</Text>
          </View> 
        ))} 
      </View> 
    </Page> 
  </Document> 
); 

export default BidReport; 