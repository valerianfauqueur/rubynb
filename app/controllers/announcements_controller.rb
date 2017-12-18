class AnnouncementsController < ApplicationController
  before_action :set_announcement, only: [:show, :edit, :update, :destroy]

  # GET /announcements
  # GET /announcements.json
  def index
    announcements = Announcement.all
    if params[:category]
      announcements = announcements.where(["game_type = ?", params[:category]])
    end
    if params['sort']
      f = params['sort'].split(',').first
      field = f[0] == '-' ? f[1..-1] : f
      order = f[0] == '-' ? 'DESC' : 'ASC'
      if Announcement.new.has_attribute?(field)
        announcements = announcements.order("#{field} #{order}")
      end
    end
    announcements = Announcement.page(params[:page] ? params[:page][:number] : 1)
    render json: announcements, meta: pagination_meta(announcements),  include: ['user', 'pictures']
  end

  # GET /announcements/1
  # GET /announcements/1.json
  def show
  end

  # GET /announcements/new
  def new
    @announcement = Announcement.new
    @announcement.pictures.build
  end

  # GET /announcements/1/edit
  def edit
  end

  # POST /announcements
  # POST /announcements.json
  def create
    @announcement = Announcement.new(announcement_params)
    @announcement.user = current_user
    respond_to do |format|
      if @announcement.save
        format.html { redirect_to @announcement, notice: 'Announcement was successfully created.' }
        format.json { render :show, status: :created, location: @announcement }
      else
        format.html { render :new }
        format.json { render json: @announcement.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /announcements/1
  # PATCH/PUT /announcements/1.json
  def update
    respond_to do |format|
      if @announcement.update(announcement_params)
        format.html { redirect_to @announcement, notice: 'Announcement was successfully updated.' }
        format.json { render :show, status: :ok, location: @announcement }
      else
        format.html { render :edit }
        format.json { render json: @announcement.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /announcements/1
  # DELETE /announcements/1.json
  def destroy
    @announcement.destroy
    respond_to do |format|
      format.html { redirect_to announcements_url, notice: 'Announcement was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private


    def pagination_meta(object)
      {
        current_page: object.current_page,
        next_page: object.next_page,
        prev_page: object.previous_page,
        total_pages: object.total_pages,
        total_count: object.total_entries
      }
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_announcement
      @announcement = Announcement.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def announcement_params
      params.require(:announcement).permit(
        :game_title,
        :game_type,
        :game_min_players,
        :game_max_players,
        :game_min_age,
        :game_status,
        :game_min_duration,
        :game_max_duration,
        :title,
        :description,
        :availibity,
        :min_reservation,
        :max_reservation,
        :renting,
        :caution,
        game_content: [],
        game_tags: [],
        pictures_attributes: [:image, :image_file_name]
      )
    end
end
