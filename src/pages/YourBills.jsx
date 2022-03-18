// import React, {useContext} from 'react';
// import {NavBar, OrderCard, Footer} from '../components';
// import {useHistory} from 'react-router-dom';
// import {Spinner, Row, Col} from 'react-bootstrap';
// import {CurrentUserContext} from '../ContextProvider/CurrentUserContextProvider';
// import {BillContext} from '../ContextProvider/BillContextProvider';
// import {returnTotalPrice} from '../helpers';
// import './YourBills.css';

// export default function YourBills() {
//   const {currentUser, getCurrentUserLoading} = useContext(CurrentUserContext);
//   const {billList, getBillListLoading} = useContext(BillContext);
//   const history = useHistory();

//   if ((currentUser && currentUser.role === 'client') || !currentUser) {
//     return history.push('/');
//   }

//   return getBillListLoading || getCurrentUserLoading ? (
//     <Spinner animation="grow" variant="danger" />
//   ) : (
//     <div className="bill__list">
//       <NavBar />
//       <Row className="bill__list__container">
//         <Col xs={12} sm={9} className="order__card__list">
//           <div className="order__ad__image">
//             <h1>Your bill list</h1>
//           </div>
//           {billList.reverse().map((billList, index) => {
//             return <OrderCard order={billList} key={index} forSaleman />;
//           })}
//         </Col>

//         <Col xs={12} sm={3} className="order-checkout-ct">
//           <div className="order__checkout__total__price">
//             <span>Subtotals {billList?.length} bills:</span>
//             <span>${returnTotalPrice(billList)}</span>
//           </div>
//           <div className="order__checkout__gift__checkbox">
//             <input type="checkbox" />
//             <label for="gift"> These orders do not include VAT tax</label>
//           </div>
//         </Col>
//       </Row>
//       <Footer />
//     </div>
//   );
// }
