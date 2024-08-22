in ques no login func
so i created a sample token using https://jwt.io/
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0dXNlciJ9.Npwd6BhK4fDT7NTEqk3v6Ccbgvpzflpmq6-4CtC6jDI"

Testing vendor
post req
![alt text](images/image.png)
// vendor data
{
"name": "Acme Corp",
"contactDetails": "John Doe, +1-800-123-4567, john.doe@acme.com",
"address": "123 Elm Street, Springfield",
"vendorCode": "ACME123"
}

get req
![alt text](images/getall.png)

get particular vendor
![alt text](images/getParticularvendor.png)

vendor performance
![alt text](vendorPerformance.png)

delete particular vendor
![alt text](images/deleteVendor.png)

---

Testing order
create order
![alt text](images/createOrder.png)
//order data
{
"poNumber": "PO12345",
"vendor": "66c6c1f83a600d7faab29f32",
"orderDate": "2024-08-21",
"deliveryDate": "2024-09-01",
"items": [
{
"name": "Widget A",
"quantity": 10
},
{
"name": "Gadget B",
"quantity": 5
}
],
"quantity": 15,
"status": "pending",
"issueDate": "2024-08-21"
}

get order
![alt text](images/getOrder.png)

get specific order
![alt text](images/specificOrder.png)

update order
![alt text](images/updateOrder.png)

order acknowledge
![alt text](images/orderAcknowledge.png)

delete order
![alt text](images/deleteOrder.png)

---

Db screenshot
![alt text](images/historicalperformances.png)

![alt text](images/purchaseorders.png)

![alt text](images/vendors.png)
