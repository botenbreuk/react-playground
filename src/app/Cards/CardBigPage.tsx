import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import { Icon, Page } from '../../ui';

export default function CardBigPage() {
  return (
    <Page>
      <Card className="card-light">
        <CardHeader>
          <div className="card-title">Form elements</div>
        </CardHeader>
        <CardBody>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Example textarea
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Disabled input"
              aria-label="Disabled input example"
              disabled
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              value="Disabled readonly input"
              aria-label="Disabled input example"
              disabled
              readOnly
            />
          </div>

          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticEmail"
                value="email@example.com"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Default file input example
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleDataList" className="form-label">
              Datalist example
            </label>
            <input
              className="form-control"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="Type to search..."
            />
            <datalist id="datalistOptions">
              <option value="San Francisco" />
              <option value="New York" />
              <option value="Seattle" />
              <option value="Los Angeles" />
              <option value="Chicago" />
            </datalist>
          </div>

          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue="0"
            >
              <option value="0">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Disabled select example"
              defaultValue="0"
              disabled
            >
              <option value="0">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              defaultValue={['0']}
              multiple
              aria-label="multiple select example"
            >
              <option value="0">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Default checkbox
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Checked checkbox
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDisabled"
                disabled
              />
              <label className="form-check-label" htmlFor="flexCheckDisabled">
                Disabled checkbox
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckCheckedDisabled"
                defaultChecked
                disabled
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckCheckedDisabled"
              >
                Disabled checked checkbox
              </label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Default radio
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Default checked radio
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDisabled"
                id="flexRadioDisabled"
                disabled
              />
              <label className="form-check-label" htmlFor="flexRadioDisabled">
                Disabled radio
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDisabled"
                id="flexRadioCheckedDisabled"
                defaultChecked
                disabled
              />
              <label
                className="form-check-label"
                htmlFor="flexRadioCheckedDisabled"
              >
                Disabled checked radio
              </label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Default switch checkbox input
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                defaultChecked
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckChecked"
              >
                Checked switch checkbox input
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDisabled"
                disabled
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDisabled"
              >
                Disabled switch checkbox input
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckCheckedDisabled"
                defaultChecked
                disabled
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckCheckedDisabled"
              >
                Disabled checked switch checkbox input
              </label>
            </div>
          </div>
          <div className="mb-3">
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-outlined"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="btn-check-outlined"
            >
              Single toggle
            </label>
          </div>
          <div className="mb-3">
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-2-outlined"
              defaultChecked
              autoComplete="off"
            />
            <label
              className="btn btn-outline-secondary"
              htmlFor="btn-check-2-outlined"
            >
              Checked
            </label>
          </div>
          <div className="mb-3">
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="success-outlined"
              autoComplete="off"
              defaultChecked
            />
            <label
              className="btn btn-outline-success"
              htmlFor="success-outlined"
            >
              Checked success radio
            </label>

            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="danger-outlined"
              autoComplete="off"
            />
            <label className="btn btn-outline-danger" htmlFor="danger-outlined">
              Danger radio
            </label>
          </div>
          <div className="mb-3">
            <Row>
              <Col xs={6}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <Icon type="person-fill" className="text-2" color="#777" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <Icon type="lock-fill" className="text-2" color="#777" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </Col>
              <Col xs={6}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <span className="input-group-text" id="basic-addon1">
                    <Icon type="person-fill" className="text-2" color="#777" />
                  </span>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                  <span className="input-group-text" id="basic-addon1">
                    <Icon type="lock-fill" className="text-2" color="#777" />
                  </span>
                </div>
              </Col>
            </Row>

            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <span className="input-group-text" id="basic-addon2">
                @example.com
              </span>
            </div>

            <label htmlFor="basic-url" className="form-label">
              Your vanity URL
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon3">
                https://example.com/users/
              </span>
              <input
                type="text"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">$</span>
              <input
                type="text"
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
              />
              <span className="input-group-text">.00</span>
            </div>

            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
              />
              <span className="input-group-text">@</span>
              <input
                type="text"
                className="form-control"
                placeholder="Server"
                aria-label="Server"
              />
            </div>

            <div className="input-group">
              <span className="input-group-text">With textarea</span>
              <textarea
                className="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-primary">
              Notifications{' '}
              <span className="badge bg-danger rounded-pill">300+</span>
            </button>
          </div>
        </CardBody>
        <CardFooter className="text-primary">2022-01-01</CardFooter>
      </Card>
    </Page>
  );
}
