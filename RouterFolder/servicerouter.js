
const express = require('express');

const service = require('../controller/Servic   es');
const rou = express.Router();


rou.route('/appointment').post(service.appointment);
rou.route('/approved/:id').post(service.approved);
rou.route('/usernotification/:id').patch(service.usernotification);

rou.route('/adminnotification/:id').patch(service.adminnotification);
rou.route('/userappointmentlist/:id').get(service.userappointment);
rou.route('/userapprovedlist/:id').get(service.userapproved);
rou.route('/appointmentlist').get(service.appointmentlistfordoc);
rou.route('/cancelappointment/:id').delete(service.cancelAppointment);
rou.route('/approvedlists').get(service.approveddata);
module.exports = rou;