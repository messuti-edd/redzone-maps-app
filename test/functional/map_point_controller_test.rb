require 'test_helper'

class MapPointControllerTest < ActionController::TestCase
  test "should get create" do
    get :create
    assert_response :success
  end

  test "should get delete" do
    get :destroy
    assert_response :success
  end

end
