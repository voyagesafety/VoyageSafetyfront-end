import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../actions/detail.action";
import "./detail.css";
import "./detail2.css";
import Carousel from "react-bootstrap/Carousel";
import { WaveLoading } from "react-loadingg";
import { Pie } from "react-chartjs-2";

let url = "";

const disablePastDate = () => {
  const today = new Date();
  const dd = String(today.getDate() + 1).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};

class Detail extends Component {
  componentDidMount() {
    let EstId = this.props.match.params.EstId;
    this.props.getDetail(EstId);
    this.setState({ EstId });
  }

  constructor(props) {
    super(props);
    this.state = {
      Date: "",
      Error: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.Date !== "") {
      this.props.history.push(
        `/confirmbooking/${this.state.Date}/${this.state.EstId}`
      );
    } else {
      this.setState({ Error: "โปรดเลือกวันที่" });
    }
  };

  showInfo = () => {
    try {
      const { result, isFetching } = this.props.detailReducer;
      if (isFetching) {
        return (
          <div style={{ marginTop: "500px" }}>
            <WaveLoading />
          </div>
        );
      } else {
        const data = result.result;
        const arrImg = result.arrImg;
        console.log(result.percentageData); 
        const datachart = {
          labels: ["ได้รับวัคซีนแล้ว", "ยังไม่ได้รับวัคซีน"],
          datasets: [
            {
              label: "วัคซีน",
              data: [
                parseInt(result.percentageData[0].Total) + 1 - parseInt(result.percentageData[0].NotVaccinated),
                parseInt(result.percentageData[0].NotVaccinated),
              ],
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        };
        const { Error } = this.state;
        return (
          !isFetching &&
          result != null && (
            <div>
              <section className="u-clearfix sectiondetail" id="sec-c6a2">
                <div className="u-clearfix u-sheet u-sheet-1">
                  <div className="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
                    <div className="u-layout">
                      <div className="u-layout-row">
                        <div className="u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                          <div className="u-container-layout u-container-layout-1 ">
                            <Carousel>
                              {arrImg.map((item) => (
                                <Carousel.Item interval={1500}>
                                  <img
                                    src={item.Img}
                                    alt="mainImage"
                                    style={{ width: "100%" }}
                                    className="w3-hover-opacity img"
                                  />
                                </Carousel.Item>
                              ))}
                            </Carousel>
                            {arrImg.length === 0 && (
                              <img
                                src={"https://via.placeholder.com/700x350"}
                                alt="mainImage"
                                style={{ width: "100%" }}
                                className="w3-hover-opacity img"
                              />
                            )}
                            <section
                              className="u-clearfix sectiondetail2"
                              id="sec-c6a2"
                            >
                              <div className="u-container-style u-expanded-width-sm u-expanded-width-xs u-grey-10 u-group u-radius-10 u-shape-round u-group-1">
                                <div className="u-expanded-width u-grey-10 u-radius-10 u-shape u-shape-round u-shape-2">
                                  <h5 className="u-text u-text-default u-text-1">
                                    การจองคิว
                                    <br />
                                  </h5>
                                  <div className="u-expanded-width-sm u-expanded-width-xs u-form u-form-1">
                                    <form
                                      className="u-clearfix u-form-horizontal u-form-spacing-15 u-inner-form"
                                      style={{ padding: 15 }}
                                      source="custom"
                                    >
                                      <div class="row">
                                        <div class="col-lg-10">
                                          <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            min={disablePastDate()}
                                            className="textInput"
                                            onChange={(e) => {
                                              this.setState({
                                                Date: e.target.value,
                                              });
                                            }}
                                          />
                                        </div>
                                        <div class="col-lg-2">
                                          <a
                                            href={url}
                                            className="u-btn u-btn-round u-btn-submit u-hover-palette-1-light-1 u-radius-6 u-button-style u-btn-1"
                                            style={{
                                              background: "#0F4A69",
                                              color: "#ffffff",
                                            }}
                                            onClick={this.handleSubmit}
                                          >
                                            จองคิว
                                            <br />
                                          </a>
                                          {Error.length > 0 && (
                                            <span
                                              style={{
                                                position: "absolute",
                                                width: "70px",
                                                marginTop: "10px",
                                                marginLeft: "10px",
                                              }}
                                              className="error"
                                            >
                                              {Error}
                                            </span>
                                          )}
                                          <input
                                            type="submit"
                                            defaultValue="submit"
                                            className="u-form-control-hidden"
                                          />
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                        <div className="u-container-style u-layout-cell u-size-30 u-layout-cell-2">
                          <div className="u-container-layout u-container-layout-2">
                            <div className="u-container-style u-expanded-width-sm u-expanded-width-xs u-grey-10 u-group u-radius-10 u-shape-round u-group-1">
                              <div className="u-container-layout u-container-layout-3">
                                {/* <h5 className="u-text u-text-default u-text-1"> */}
                                <div className="u-container-layout u-container-layout-4">
                                  <p className="u-text u-text-default u-text-1 names">
                                    <b>{data.Name}</b>
                                  </p>
                                  <p className="u-text u-text-2 dess">
                                    {data.Description}
                                  </p>
                                </div>
                                {/* </h5> */}
                                {/* <p className="u-text u-text-2">Description</p> */}
                              </div>
                            </div>
                            <div className="u-expanded-width-sm u-expanded-width-xs u-grey-10 u-radius-10 u-shape u-shape-round u-shape-1">
                              <div
                                className="container"
                                style={{ padding: "8px 30px" }}
                              >
                                <div className="row">
                                  <div className="col-4">
                                    <b>การฉีดวัคซีน</b>
                                    <p>{data.Percent} %</p>
                                  </div>
                                  <div className="col-8">
                                    <div style={{ height: "100px" }}>
                                      <Pie
                                        data={datachart}
                                        options={{ maintainAspectRatio: false }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="u-expanded-width u-grey-10 u-radius-10 u-shape u-shape-round u-shape-2">
                              <div className="address-con">
                                <div className="container">
                                  <div className="row">
                                    <div className="col-xl-6 col-lg-6">
                                      <img
                                      alt="Thumbnail"
                                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${data.Lat},${data.Lng}&zoom=18&size=500x500&key=AIzaSyATAXCWMqd7hmu44d93FCJpPTGcHLKN6lg&markers="https://img.icons8.com/dusk/64/000000/marker.png"|${data.Lat},${data.Lng}`}
                                        className="map-img"
                                      />
                                    </div>
                                    <div className="col-xl-6 col-lg-6">
                                      <div className="address-detail-con">
                                        <div className="address-detail">
                                          {data.Address}{" "}
                                        </div>
                                        <div className="address-detail">
                                          {data.District}
                                        </div>
                                        <div className="address-detail">
                                          {data.Province} {data.PostCode}
                                        </div>

                                        <button
                                          className="btn btn-primary"
                                          style={{
                                            backgroundColor: "rgb(15 74 105)",
                                          }}
                                          onClick={() => {
                                            window.open(
                                              `https://www.google.com/maps/search/?api=1&query=${data.Lat},${data.Lng}`
                                            );
                                          }}
                                        >
                                          ดูแผนที่
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )
        );
      }
    } catch (e) {}
  };

  render() {
    return <div>{this.showInfo()}</div>;
  }
}

const mapStateToProps = ({ detailReducer }) => ({
  detailReducer,
});

const mapDispatchToProps = {
  ...action,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
