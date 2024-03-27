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

const ProductReport = ({ products }) => ( 
  <Document> 
    <Page size="A4" style={styles.page}> 
      <View style={styles.section}> 
        <Text>Product Report</Text> 
        {products.map((product, i) => ( 
          <View key={i}> 
            <Text>Title: {product.title}</Text> 
            <Text>Description: {product.description}</Text> 
            <Text>Amount: ₹{product.startingPrice}</Text> 
            <Text>Expiry Date: {product.endingDate}</Text> 
            <Text>Status: {product.status}</Text> 
            <Text>------------------------------------</Text>
          </View> 
        ))} 
      </View> 
    </Page> 
  </Document> 
); 

export default ProductReport; 