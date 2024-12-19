require "application_system_test_case"

class QuestionGroupsTest < ApplicationSystemTestCase
  setup do
    @question_group = question_groups(:one)
  end

  test "visiting the index" do
    visit question_groups_url
    assert_selector "h1", text: "Question groups"
  end

  test "should create question group" do
    visit question_groups_url
    click_on "New question group"

    fill_in "Title", with: @question_group.title
    click_on "Create Question group"

    assert_text "Question group was successfully created"
    click_on "Back"
  end

  test "should update Question group" do
    visit question_group_url(@question_group)
    click_on "Edit this question group", match: :first

    fill_in "Title", with: @question_group.title
    click_on "Update Question group"

    assert_text "Question group was successfully updated"
    click_on "Back"
  end

  test "should destroy Question group" do
    visit question_group_url(@question_group)
    click_on "Destroy this question group", match: :first

    assert_text "Question group was successfully destroyed"
  end
end
