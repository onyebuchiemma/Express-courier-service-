document.addEventListener('DOMContentLoaded', function () {
    const shipmentForm = document.getElementById('shipmentForm');
    const shipmentDetailsForm = document.getElementById('shipmentDetails');
    const receiptSection = document.getElementById('receipt');
    const printableReceipt = document.getElementById('printableReceipt');
    const shipmentListSection = document.getElementById('shipmentList');
    const storedShipmentsDiv = document.getElementById('storedShipments');
    const trackFormContainer = document.getElementById('trackFormContainer');
    const trackForm = document.getElementById('trackForm');
    const trackingResultDiv = document.getElementById('trackingResult');

    const shipments = JSON.parse(localStorage.getItem('shipments')) || [];

    function renderShipmentList() {
        storedShipmentsDiv.innerHTML = '';
        shipments.forEach((shipment, index) => {
            const shipmentDiv = document.createElement('div');
            shipmentDiv.classList.add('shipment');
            shipmentDiv.textContent = `Shipment ${index + 1} - ${shipment.trackingNumber}`;
            shipmentDiv.addEventListener('click', () => toggleShipmentDetails(index));
            storedShipmentsDiv.appendChild(shipmentDiv);

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('hidden');
            detailsDiv.innerHTML = `
                <p><strong>Sender Name:</strong> ${shipment.senderName}</p>
                <p><strong>Sender Address:</strong> ${shipment.senderAddress}</p>
                <p><strong>Sender Email:</strong> ${shipment.senderEmail}</p>
                <p><strong>Sender Phone:</strong> ${shipment.senderPhone}</p>
                <p><strong>Receiver Name:</strong> ${shipment.receiverName}</p>
                <p><strong>Receiver Address:</strong> ${shipment.receiverAddress}</p>
                <p><strong>Receiver Email:</strong> ${shipment.receiverEmail}</p>
                <p><strong>Receiver Phone:</strong> ${shipment.receiverPhone}</p>
                <p><strong>Shipment Type:</strong> ${shipment.shipmentType}</p>
                <p><strong>Weight:</strong> ${shipment.shipmentWeight}</p>
                <p><strong>Courier:</strong> ${shipment.courier}</p>
                <p><strong>Packages:</strong> ${shipment.packages}</p>
                <p><strong>Mode:</strong> ${shipment.mode}</p>
                <p><strong>Product:</strong> ${shipment.product}</p>
                <p><strong>Carrier:</strong> ${shipment.carrier}</p>
                <p><strong>Carrier Ref Number:</strong> ${shipment.carrierRefNumber}</p>
                <p><strong>Comment:</strong> ${shipment.comment}</p>
                <p><strong>Delivery Date:</strong> ${shipment.deliveryDate}</p>
                <p><strong>Departure Date:</strong> ${shipment.departureDate}</p>
                <p><strong>Payment Option:</strong> ${shipment.paymentOption}</p>
                <p><strong>Total Flight:</strong> ${shipment.totalFlight}</p>
                <button onclick="editShipment(${index})">Edit</button>
            `;
            storedShipmentsDiv.appendChild(detailsDiv);
        });
    }

    function toggleShipmentDetails(index) {
        const shipmentDiv = storedShipmentsDiv.children[index * 2 + 1];
        if (shipmentDiv.classList.contains('hidden')) {
            shipmentDiv.classList.remove('hidden');
        } else {
            shipmentDiv.classList.add('hidden');
        }
    }

    document.getElementById('addShipment').addEventListener('click', function () {
        shipmentForm.classList.toggle('hidden');
        receiptSection.classList.add('hidden');
        shipmentListSection.classList.add('hidden');
        trackFormContainer.classList.add('hidden');
    });

    document.getElementById('editShipment').addEventListener('click', function () {
        shipmentForm.classList.add('hidden');
        receiptSection.classList.add('hidden');
        shipmentListSection.classList.toggle('hidden');
        trackFormContainer.classList.add('hidden');
    });

    document.getElementById('viewShipments').addEventListener('click', function () {
        shipmentForm.classList.add('hidden');
        receiptSection.classList.add('hidden');
        shipmentListSection.classList.toggle('hidden');
        trackFormContainer.classList.add('hidden');
    });

    document.getElementById('trackShipment').addEventListener('click', function () {
        shipmentForm.classList.add('hidden');
        receiptSection.classList.add('hidden');
        shipmentListSection.classList.add('hidden');
        trackFormContainer.classList.toggle('hidden');
    });

    shipmentDetailsForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const shipment = {
            senderName: document.getElementById('senderName').value,
            senderAddress: document.getElementById('senderAddress').value,
            senderEmail: document.getElementById('senderEmail').value,
            senderPhone: document.getElementById('senderPhone').value,
            receiverName: document.getElementById('receiverName').value,
            receiverAddress: document.getElementById('receiverAddress').value,
            receiverEmail: document.getElementById('receiverEmail').value,
            receiverPhone: document.getElementById('receiverPhone').value,
            shipmentType: document.getElementById('shipmentType').value,
            shipmentWeight: document.getElementById('shipmentWeight').value,
            courier: document.getElementById('courier').value,
            packages: document.getElementById('packages').value,
            mode: document.getElementById('mode').value,
            product: document.getElementById('product').value,
            carrier: document.getElementById('carrier').value,
            carrierRefNumber: document.getElementById('carrierRefNumber').value,
            comment: document.getElementById('comment').value,
            deliveryDate: document.getElementById('deliveryDate').value,
            departureDate: document.getElementById('departureDate').value,
            paymentOption: document.getElementById('paymentOption').value,
            totalFlight: document.getElementById('totalFlight').value,
            trackingNumber: generateTrackingNumber(),
            timestamp: new Date()
        };

        shipments.push(shipment);
        localStorage.setItem('shipments', JSON.stringify(shipments));
        renderShipmentList();

        displayReceipt(shipment);
    });

    function displayReceipt(shipment) {
        document.getElementById('printedSenderName').textContent = shipment.senderName;
        document.getElementById('printedSenderAddress').textContent = shipment.senderAddress;
        document.getElementById('printedSenderEmail').textContent = shipment.senderEmail;
        document.getElementById('printedSenderPhone').textContent = shipment.senderPhone;
        document.getElementById('printedReceiverName').textContent = shipment.receiverName;
        document.getElementById('printedReceiverAddress').textContent = shipment.receiverAddress;
        document.getElementById('printedReceiverEmail').textContent = shipment.receiverEmail;
        document.getElementById('printedReceiverPhone').textContent = shipment.receiverPhone;
        document.getElementById('printedShipmentType').textContent = shipment.shipmentType;
        document.getElementById('printedShipmentWeight').textContent = shipment.shipmentWeight;
        document.getElementById('printedCourier').textContent = shipment.courier;
        document.getElementById('printedPackages').textContent = shipment.packages;
        document.getElementById('printedMode').textContent = shipment.mode;
        document.getElementById('printedProduct').textContent = shipment.product;
        document.getElementById('printedCarrier').textContent = shipment.carrier;
        document.getElementById('printedCarrierRefNumber').textContent = shipment.carrierRefNumber;
        document.getElementById('printedComment').textContent = shipment.comment;
        document.getElementById('printedDeliveryDate').textContent = shipment.deliveryDate;
        document.getElementById('printedDepartureDate').textContent = shipment.departureDate;
        document.getElementById('printedPaymentOption').textContent = shipment.paymentOption;
        document.getElementById('printedTotalFlight').textContent = shipment.totalFlight;
        document.getElementById('printedTrackingNumber').textContent = shipment.trackingNumber;

        shipmentForm.classList.add('hidden');
        receiptSection.classList.remove('hidden');
    }

    document.getElementById('printReceiptBtn').addEventListener('click', function () {
        window.print();
    });

    trackForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const trackingNumber = document.getElementById('trackingNumber').value;
        const shipment = shipments.find(s => s.trackingNumber === trackingNumber);

        if (shipment) {
            trackingResultDiv.innerHTML = `
                <p><strong>Sender Name:</strong> ${shipment.senderName}</p>
                <p><strong>Sender Address:</strong> ${shipment.senderAddress}</p>
                <p><strong>Sender Email:</strong> ${shipment.senderEmail}</p>
                <p><strong>Sender Phone:</strong> ${shipment.senderPhone}</p>
                <p><strong>Receiver Name:</strong> ${shipment.receiverName}</p>
                <p><strong>Receiver Address:</strong> ${shipment.receiverAddress}</p>
                <p><strong>Receiver Email:</strong> ${shipment.receiverEmail}</p>
                <p><strong>Receiver Phone:</strong> ${shipment.receiverPhone}</p>
                <p><strong>Shipment Type:</strong> ${shipment.shipmentType}</p>
                <p><strong>Weight:</strong> ${shipment.shipmentWeight}</p>
                <p><strong>Courier:</strong> ${shipment.courier}</p>
                <p><strong>Packages:</strong> ${shipment.packages}</p>
                <p><strong>Mode:</strong> ${shipment.mode}</p>
                <p><strong>Product:</strong> ${shipment.product}</p>
                <p><strong>Carrier:</strong> ${shipment.carrier}</p>
                <p><strong>Carrier Ref Number:</strong> ${shipment.carrierRefNumber}</p>
                <p><strong>Comment:</strong> ${shipment.comment}</p>
                <p><strong>Delivery Date:</strong> ${shipment.deliveryDate}</p>
                <p><strong>Departure Date:</strong> ${shipment.departureDate}</p>
                <p><strong>Payment Option:</strong> ${shipment.paymentOption}</p>
                <p><strong>Total Flight:</strong> ${shipment.totalFlight}</p>
                <p><strong>Tracking Number:</strong> ${shipment.trackingNumber}</p>
                <p><strong>Timestamp:</strong> ${shipment.timestamp}</p>
            `;
            trackingResultDiv.classList.remove('hidden');
        } else {
            trackingResultDiv.innerHTML = '<p>Tracking number not found.</p>';
            trackingResultDiv.classList.remove('hidden');
        }
    });

    function generateTrackingNumber() {
        return 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    renderShipmentList();
});
